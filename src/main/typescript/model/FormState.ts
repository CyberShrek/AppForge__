interface FormState {
    message?: string
    hidden?: string[]
    wrong?: string[]
    values?: FormValues
}


// After parse
type SectionKeys      = Set<string>
type SectionFieldKeys = Map<string, Set<string>>