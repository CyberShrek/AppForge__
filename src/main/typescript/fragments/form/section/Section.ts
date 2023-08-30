import {Fragment} from "../../Fragment"
import {Field} from "./field/Field"
import {valueOrDefault} from "chart.js/helpers"
import Form from "../Form"
import {DatepickerField} from "./field/DatepickerField"
import {CheckboxField} from "./field/CheckboxField"
import {SelectField} from "./field/select/SelectField"

export class Section extends Fragment<HTMLDivElement>{

    private fields = new Map<string, Field<any>>()

    get = (fieldKey: string) => this.fields.get(fieldKey)

    constructor(public form: Form, config: FormSectionConfig) {
        super(`<div class="section"><p>${valueOrDefault(config.title, "")}</p><slot></slot></div>`)
        
        for (const fieldKey in config.fields) {
            this.fields.set(fieldKey, this.createField(config.fields[fieldKey]))
        }

        form.append(this)
    }

    private createField(config: CheckboxFieldConfig | DatepickerFieldConfig | SelectFieldConfig): Field<any>{
        switch (config.type){
            case "checkbox":   return new CheckboxField(this, config)
            case "datepicker": return new DatepickerField(this, config)
            case "select":     return new SelectField(this, config)
        }
    }
}

