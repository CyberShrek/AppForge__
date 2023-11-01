interface FormStatement{
    message?: string
    show?: string[]
    hide?: string[]
    wrong?: string[]
    setValues?: {[fieldName: string]: any}
}