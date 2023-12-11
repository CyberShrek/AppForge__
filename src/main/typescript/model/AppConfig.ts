type AppConfig = {
    code: string
    info?: {
        updateDate?: string
        description?: string
        additional?: string
    }
} & FormNReportsConfig & {
    complex?: ({title: string} & FormNReportsConfig)[]
}

type FormNReportsConfig = {
    form: FormConfig
} & {
    // slotName must end with the "Slot" word
    [slotName: string]: ReportSlotConfig
}