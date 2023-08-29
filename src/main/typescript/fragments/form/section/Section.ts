import {Fragment} from "../../Fragment"
import {Field} from "./field/Field"
import {valueOrDefault} from "chart.js/helpers"

export class Section extends Fragment<HTMLDivElement>{

    fields = new Map<string, Field<any>>()

    constructor(config: FormSectionConfig) {
        super(`<div class="section"><p>${valueOrDefault(config.title, "")}</p><slot></slot></div>`)
        
        for (const fieldKey in config.fields) {
            this.fields.set(fieldKey, new Field(config.fields[fieldKey]))
            this.append(this.fields[fieldKey])
        }
    }
}