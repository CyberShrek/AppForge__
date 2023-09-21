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
    instantSubmit?: boolean
    statementPath?: string
    gridLayout?: "horizontal" | "vertical"
    gridSize?: number
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

type FieldConfig = SwitchFieldConfig | DatepickerFieldConfig | SelectFieldConfig | TextFieldConfig

interface CommonFieldConfig {
    label?: string
    size?: number
    type: "switch" | "datepicker" | "select" | "text"
}

interface SwitchFieldConfig extends CommonFieldConfig, SwitchConfig{
    type: "switch"
}

interface DatepickerFieldConfig extends CommonFieldConfig, DatepickerConfig{
    type: "datepicker"
}

interface SelectFieldConfig extends CommonFieldConfig, SelectConfig{
    type: "select"
}

interface TextFieldConfig extends CommonFieldConfig{
    type: "text"
    area?: number
}

interface ReportSlotConfig {
    title: string
    isModal?: boolean
    associatedWith?: string
}