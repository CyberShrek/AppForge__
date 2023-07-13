interface Pair<F, S>{
    first: F
    second: S
}

interface DateRange{
    start: Date|string
    end: Date|string
}

interface Option{
    label: string,
    value?: string,
    alias?: string,
    description?: string
}