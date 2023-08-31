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
    // Works like Endpoint.subscribeToFields but with field locations as values
    propertiesSources: {
        postSovietToggle: string,
        startDate: string,
        endDate: string,
        carriers: string,
        countries: string,
        roads: string
    }
    properties?: {
        postSovietToggle: boolean,
        startDate: string,
        endDate: string,
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