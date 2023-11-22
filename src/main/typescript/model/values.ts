type FormattedDate = [string, string] | string

type OptionKey = string
type OptionLabel = string
type OptionsMap = Map<OptionKey, OptionLabel>

type JsonProperties = { [key: string]: object }

type FormValues = {
    [section_field: string]: any
}

type FieldOptions = {
    [section_field: string]: OptionsMap
}