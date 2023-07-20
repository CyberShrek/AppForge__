type DateRange = [string, string]

type OptionKey = string
type OptionLabel = string

type Option = {
    value: OptionKey,
    label: OptionLabel,
    alias?: string,
    description?: string
}

type MainFormValues = {[fieldLocation: string]: object}