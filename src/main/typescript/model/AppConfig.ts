type AppConfig = {
    code: string
    info?: {
        updateDate?: string
        description?: string
        additional?: string
    }
} & {
    // contentName should ends with either "Form" or "Slot" word to determine what is what
    [contentName: string]: FormConfig | ReportSlotConfig | any
}

type FormConfig = {
    title?: string
    submitText?: string
    submitPath?: string
    instantSubmit?: boolean
    statementPath?: string
    layout?: "horizontal" | "vertical"
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

type FieldConfig = CommonFieldConfig & (CheckboxConfig | CalendarConfig | SelectConfig | TextInputConfig)

interface CommonFieldConfig {
    label?: string
    size?: number
    type: "switch" | "calendar" | "select" | "text"
}

interface ReportSlotConfig {
    title: string
    isModal?: boolean
    associatedWith?: string
}

interface CheckboxConfig{
    label?: string
    switch?: boolean
}

interface SelectConfig {
    multiple?: boolean
    search?: boolean
    showCodes?: boolean
    disableSelectAll?: boolean
    maxValues?: number
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