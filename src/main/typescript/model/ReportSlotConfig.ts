interface ReportSlotConfig {
    title: string
    charts?: ChartConfig[]
    labels?: LabelConfig[]
    table?: TableConfig
    context?: ContextConfig
}

///////////
// LABEL //
///////////
interface LabelConfig {
    title?: string
    value?: string
    unit?: string
    compare?: string
    image?: string
}

///////////
// CHART //
///////////
interface ChartConfig {
    title?: string
    key: string
    graphs: ChartValue[]
    size?: number
}

interface ChartValue {
    type: "line" | "bar" | "pie" | "donut"
    title: string
    value: string
}

interface LineGraph extends ChartValue {
    type:   "line"
    dash?:  boolean
    curve?: boolean
    fill?:  boolean
}

interface BarGraph extends ChartValue {
    type: "bar"
}

interface PieGraph extends ChartValue {
    type: "pie" | "donut"
}

///////////
// TABLE //
///////////
interface TableConfig {
    columns?: ColumnMeta[]
    total?: boolean,
    labelize?: boolean,
    checkboxAction?: {
        title?: string
        buttons?: ActionButton[]
    }
}

interface ColumnMeta extends ApiAction {
    title?: string
    value?: string
    filter?: boolean
    totalize?: boolean,
    labelize?: boolean,
    collapse?: boolean,
    linkCells?: string[],
    columns?: ColumnMeta[]
}

/////////////
// CONTEXT //
/////////////
interface ContextConfig {
    fields: { [label: string]: string }
    pickedData: {
        title: string
        columns: string[]
    }[]
} // Value is field key

//////////////
// FEATURES //
//////////////

interface ActionButton extends ApiAction {
    title?: string
    image?: string
    hint?: string
}

interface ApiAction {
    linkToReport?: string
    linkToFile?:   string
}

interface SubmittedApiAction extends ApiAction{
    pickedData: MatrixData
}