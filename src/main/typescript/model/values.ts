type FormattedDate = [string, string] | string

type OptionKey = string
type OptionLabel = string

type Options = Map<OptionKey, OptionLabel>
type Option = [key: OptionKey, label: OptionLabel]

type JsonProperties = { [key: string]: object }