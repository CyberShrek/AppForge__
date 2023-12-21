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
    title?: string,
    formula?: {
        value?: string,
        comparison?: string,
        proportion?: string
    },
    text?: {
        value?: string,
        comparison?: string,
        proportion?: string
    },
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
    formula: string
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
    total?: boolean,
    group?: boolean,
    labelize?: boolean,
    checkboxAction?: {
        title?: string
        buttons?: ActionButton[]
    }
    columns?: (ComplexColumnMeta | ColumnMeta)[]
}

interface ComplexColumnMeta{
    title?: string
    columns?: (ComplexColumnMeta | ColumnMeta)[]
}

interface ColumnMeta extends ApiAction {
    title?: string
    formula?: string
    filter?: boolean
    labelize?: boolean
    collapse?: boolean
    linkCells?: string[]
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