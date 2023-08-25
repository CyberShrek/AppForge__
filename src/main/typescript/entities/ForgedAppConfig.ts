interface ForgedAppConfig {
    code: string
    mainForm: MainFormConfig
    reportSlots?: { [key: string]: ReportSlotConfig }
    additionalInfo?: string
}

interface MainFormConfig {
    sections?: { [key: string]: FormSectionConfig }
    validationPath?: string
    confirmButtonText?: string
}

interface FormSectionConfig {
    title?: string
    fields?: { [key: string]: Field }
}

type Field = CheckBox | Date | Select

interface CheckBox {
    type: "checkbox"
    label: string
}

interface Date {
    type: "date"
    label?: string
    maxDays?: number
}

interface Select {
    type: "select"
    label?: string
    showCodes?: boolean
    search?: boolean
    multiple?: boolean
    disableSelectAll?: boolean
    maxValues?: number
    optionsSource?: OptionsSource
}

interface OptionsSource {
    endpoint?: Endpoint
    serviceBank?: ServiceBank
}

interface Endpoint {
    path: string
    subscribeToFields: Set<string>
}

interface ServiceBank {
    type: string
    subscribeToDate: string
    extraProperties?: { [key: string]: string }
}

interface ServiceBankCarriers extends ServiceBank {
    type: "carriers"
}

interface ServiceBankCountries extends ServiceBank {
    type: "countries"
    subscribeToPostSovietCheckbox?: string
}

interface ServiceBankRoads extends ServiceBank {
    type: "roads"
    subscribeToCountries?: string
}

interface ServiceBankStations extends ServiceBank {
    type: "stations"
    subscribeToRoads?: string
}

interface ReportSlotConfig {
    title: string
    isModal?: boolean
    path: string
}