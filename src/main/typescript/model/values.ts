type FormattedDate = [string, string] | string

type OptionKey = string
type OptionLabel = string
type OptionsMap = Map<OptionKey, OptionLabel>

type JsonProperties = { [key: string]: object }

type FormValues = {
    [section_dot_field: string]: any
}

type FieldOptions = {
    [section_dot_field: string]: OptionsMap
}