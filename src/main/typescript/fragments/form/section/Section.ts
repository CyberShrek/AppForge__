import {Fragment} from "../../Fragment"
import {Field} from "./field/Field"
import {valueOrDefault} from "chart.js/helpers"
import Form from "../Form"
import {DatepickerField} from "./field/DatepickerField"
import {CheckboxField} from "./field/CheckboxField"
import {SelectField} from "./field/SelectField"

export class Section extends Fragment<HTMLDivElement>{

    readonly fields = new Map<string, Field<any>>()

    getField = (fieldKey: string) => this.fields.get(fieldKey)

    constructor(readonly form: Form, config: FormSectionConfig) {
        super(`<div class="section"><p>${valueOrDefault(config.title, "")}</p><slot></slot></div>`)
        
        for (const fieldKey in config.fields) {
            this.fields.set(fieldKey, this.createField(config.fields[fieldKey]))
        }

        form.append(this)
    }

    private createField(config: FieldLabel): Field<any>{
        switch (config.type){
            case "checkbox":   return new CheckboxField(this, config as CheckboxFieldConfig)
            case "switch":   return new CheckboxField(this, config as SwitchFieldConfig)
            case "datepicker": return new DatepickerField(this, config as DatepickerFieldConfig)
            case "select":     return new SelectField(this, config as SelectFieldConfig)
        }
    }
}

