interface InputConfig{

}

interface CheckboxInputConfig  extends InputConfig{
    label: string
}

interface SelectInputConfig extends InputConfig{
    multiple?: boolean
    search?: boolean
    showCodes?: boolean
    disableSelectAll?: boolean
    maxValues?: number
}

interface TextInputConfig extends InputConfig {
    title?: string
    placeholder?: string
}

interface DateInputConfig extends InputConfig {
    maxDays?: number
    defaultRange?: DateRange
}