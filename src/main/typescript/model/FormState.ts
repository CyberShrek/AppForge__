interface FormState {
    message?: string
    hidden?: string[]
    wrong?: string[]
    values?: {[section_dot_field: string]: any}
}

// After parse
type SectionKeys      = Set<string>
type SectionFieldKeys = Map<string, Set<string>>