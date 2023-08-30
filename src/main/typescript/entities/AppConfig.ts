interface AppConfig {
    code: string

    form?: MainFormConfig
    forms?: { [key: string]: MainFormConfig }

    reportSlot?: ReportSlotConfig
    reportSlots?: { [key: string]: ReportSlotConfig }

    info?: {
        updateDate?: string
        additional?: string
    }
}

interface MainFormConfig {
    title?: string
    sections?: { [key: string]: FormSectionConfig }
    validationPath?: string
    confirmButtonText?: string
}

interface FormSectionConfig {
    title?: string
    fields?: { [key: string]: CheckboxFieldConfig | DatepickerFieldConfig | SelectFieldConfig }
}

interface FieldConfig {
    label?: string
    type: "checkbox" | "datepicker" | "select"
}

interface CheckboxFieldConfig extends FieldConfig, CheckboxConfig{
    type: "checkbox"
}

interface DatepickerFieldConfig extends FieldConfig, DatepickerConfig{
    type: "datepicker"
}

interface SelectFieldConfig extends FieldConfig, SelectConfig{
    type: "select"
    optionsSources?: OptionsSources
}

interface OptionsSources {
    endpoint?: Endpoint
    serviceBank?: ServiceBank
}

interface Endpoint {
    path: string
    // Trigger field locations. Should be written as sectionName.fieldName
    properties: string[]
}

interface ServiceBank {
    type: "carriers" | "countries" | "roads" | "stations"
    // Could be either trigger field locations or absolute property values
    properties: {
        postSovietToggle: string | boolean,
        startDate: string,
        endDate: string,
        carriers: string | string[],
        countries: string | string[],
        roads: string | string[]
    }
    custom?: {
        [key: string]: string
    }
}

interface ReportSlotConfig {
    title: string
    isModal?: boolean
    path: string
}