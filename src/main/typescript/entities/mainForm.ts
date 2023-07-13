interface DateRange{
    start: string
    end: string
}

interface Option{
    label: string,
    value: string,
    alias?: string,
    description?: string
}

type SectionKey = string
type FieldKey = string