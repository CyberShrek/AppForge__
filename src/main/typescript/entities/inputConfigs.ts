interface ButtonConfig{
    className?: string
    text?: string
    image?: string
    hint?: string
}

interface CheckboxConfig{
    label?: string
}

interface SelectConfig {
    multiple?: boolean
    search?: boolean
    showCodes?: boolean
    disableSelectAll?: boolean
    maxValues?: number
}

interface TextInputConfig {
    title?: string
    placeholder?: string
}

interface DatepickerConfig {
    maxDays?: number
    defaultRange?: DateRange
}