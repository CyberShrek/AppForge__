type FormConfig = {
    submitText?: string
    submitPath?: string
    instantSubmit?: boolean
    statePath?: string
    layout?: "horizontal" | "vertical"
} & {
    // sectionName must end with the "Section" word
    [sectionName: string]: FormSectionConfig
}

type FormSectionConfig = {
    title?: string
} & {
    // fieldName must end with the "Field" word
    [fieldName: string]: FieldConfig
}

type FieldConfig = CommonFieldConfig & (CheckboxConfig | CalendarConfig | SelectConfig | TextInputConfig)

interface CommonFieldConfig {
    title?: string
    size?: number
    type: "switch" | "calendar" | "select" | "text"
}

interface CheckboxConfig{
    title?: string
    switch?: boolean
}

interface SelectConfig extends OptionSourcesConfig {
    multiple?: boolean
    search?: boolean
    showCodes?: boolean
    disableSelectAll?: boolean
    maxValues?: number
}

interface OptionSourcesConfig{
    endpointSource?: EndpointOptionsSetup
    serviceBankSource?: ServiceBankSetup
}

interface EndpointOptionsSetup {
    path: string,
    triggerKeys?: string[]
}

type ServiceBankType = "carriers" | "countries" | "regions" | "roads" | "stations"
interface ServiceBankSetup {
    type: ServiceBankType
    // Works like Endpoint.propertiesSources but with field locations as values
    propertiesTriggerKeys: {
        postSoviet?: string,
        date?: string,
        carriers?: string,
        countries?: string,
        roads?: string
    }
    properties?: {
        postSoviet?: boolean,
        date?: string,
        carriers?: string[],
        countries?: string[],
        roads?: string[],
        [custom: string]: any
    }
}

interface TextInputConfig {
    title?: string
    placeholder?: string
}

interface CalendarConfig {
    minYear?: number
    maxYear?: number
    minDays?: number
    maxDays?: number
    range?:  boolean
}