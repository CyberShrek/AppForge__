interface AppConfig {
    code: string

    form?: FormConfig
    forms?: { [key: string]: FormConfig }

    reportSlot?: ReportSlotConfig
    reportSlots?: { [key: string]: ReportSlotConfig }

    info?: {
        updateDate?: string
        additional?: string
    }

    debug?: boolean
}

interface FormConfig {
    title?: string
    sections?: { [key: string]: FormSectionConfig }
    statementPath?: string
    confirmButtonText?: string
}

interface FormSectionConfig {
    title?: string
    fields?: { [key: string]: FieldConfig }
}

type FieldConfig = CheckboxFieldConfig | SwitchFieldConfig | DatepickerFieldConfig | SelectFieldConfig

interface FieldLabel {
    label?: string
    type: "checkbox" | "switch" | "datepicker" | "select"
}

interface CheckboxFieldConfig extends FieldLabel, CheckboxConfig{
    type: "checkbox"
}

interface SwitchFieldConfig extends FieldLabel, SwitchConfig{
    type: "switch"
}

interface DatepickerFieldConfig extends FieldLabel, DatepickerConfig{
    type: "datepicker"
}

interface SelectFieldConfig extends FieldLabel, SelectConfig{
    type: "select"
    optionsSources?: OptionsSourcesConfig
}

interface OptionsSourcesConfig {
    endpoint?: EndpointOptionsConfig
    serviceBank?: ServiceBankConfig
}

interface EndpointOptionsConfig {
    path: string
    // Trigger field locations. Should be written as sectionName.fieldName
    propertiesSources: string[]
}

interface ServiceBankConfig {
    type: "carriers" | "countries" | "roads" | "stations"
    // Works like Endpoint.propertiesSources but with field locations as values
    propertiesSources: {
        postSoviet: string,
        date: string,
        carriers: string,
        countries: string,
        roads: string
    }
    properties?: {
        postSoviet: boolean,
        date: string,
        carriers: string[],
        countries: string[],
        roads: string[],
        [custom: string]: any
    }
}

interface ReportSlotConfig {
    title: string
    isModal?: boolean
    path: string
}