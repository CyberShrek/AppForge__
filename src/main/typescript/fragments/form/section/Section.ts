import {Fragment} from "../../Fragment"
import {Field} from "./field/Field"
import {valueOrDefault} from "chart.js/helpers"
import Form from "../Form"
import {DatepickerField} from "./field/DatepickerField"
import {SwitchField} from "./field/SwitchField"
import {SelectField} from "./field/SelectField"
import {create} from "../../../util/domWizard";
import {InlineFragment} from "../../InlineFragment";
import {TextField} from "./field/TextField";

export class Section extends InlineFragment<Form>{

    readonly fields = new Map<string, Field<any>>()

    getField = (fieldKey: string) => this.fields.get(fieldKey)

    constructor(parent: Form, gridLayout: FormConfig["layout"], config: FormSectionConfig) {
        super(parent, `
            <div class="section"
                 style="${gridLayout}">
            </div>`)
        if (config.title)
            this.append(create(`<p>${config.title}</p>`))

        // Determining fields
        for (const key in config) {
            if(key.endsWith("Field"))
                this.fields.set(key, this.createField(config[key] as FieldConfig))
        }
    }

    private createField(config: FieldConfig): Field<any>{
        switch (config.type){
            case "switch":     return new SwitchField(this, config)
            case "datepicker": return new DatepickerField(this, config)
            case "select":     return new SelectField(this, config)
            case "text":       return new TextField(this, config)
        }
    }
}

