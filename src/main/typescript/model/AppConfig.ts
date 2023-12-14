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
    slots: { [slotName: string]: ReportSlotConfig }
}