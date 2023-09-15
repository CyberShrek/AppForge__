type AppConfig = {
    code: string
    info?: {
        updateDate?: string
        additional?: string
    }
} | {
    // contentName should ends with either "Form" or "Slot" word to determine what is what
    [contentName: string]: FormConfig | ReportSlotConfig
}

type FormConfig = {
    title?: string
    submitText?: string
    submitPath?: string
    statementPath?: string
} & {
    // sectionName should ends with the "Section" word
    [sectionName: string]: FormSectionConfig
}

type FormSectionConfig = {
    title?: string
} & {
    // fieldName should ends with the "Field" word
    [fieldName: string]: FieldConfig
}


type FieldConfig = SwitchFieldConfig | DatepickerFieldConfig | SelectFieldConfig

interface FieldLabel {
    label?: string
    type: "switch" | "datepicker" | "select"
}

interface SwitchFieldConfig extends FieldLabel, SwitchConfig{
    type: "switch"
}

interface DatepickerFieldConfig extends FieldLabel, DatepickerConfig{
    type: "datepicker"
}

interface SelectFieldConfig extends FieldLabel, SelectConfig{
    type: "select"
}



interface ReportSlotConfig {
    title: string
    isModal?: boolean
}