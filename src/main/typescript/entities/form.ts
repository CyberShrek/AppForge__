
type DateRange = [string, string]

interface Option{
    label: string,
    value: string,
    alias?: string,
    description?: string
}

type SectionKey = string
type FieldKey = string

interface FormValues{
    [section: string]: {
        [field: string]: any
    }
}