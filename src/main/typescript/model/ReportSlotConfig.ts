interface ReportSlotConfig {
    title: string
    columns: {[colName: string]: ColumnMeta}
    charts?: {[chartName: string]: ChartConfig}
    table?: TableConfig
    context?: ContextConfig
}

interface ColumnMeta {
    formula?: string
    inLabel?: LabelMeta
    inChart?: ChartMeta
    inTable?: TableColumnMeta
}

///////////
// LABEL //
///////////
interface LabelMeta {
    title?: string
    unit?: string
    compare?: string
    image?: string
}

///////////
// CHART //
///////////
interface ChartConfig {
    title?: string
    keyColumn: string
    size?: number

    // Extra graphs
    average?: boolean
}


interface ChartMeta {
    chart: string
    type: "line" | "bar" | "pie" | "donut"
    title: string
}

interface LineGraphMeta extends ChartMeta {
    type:   "line"
    dash?:  boolean
    curve?: boolean
    fill?:  boolean
}

interface BarGraphMeta extends ChartMeta {
    type: "bar"
}

interface PieGraphMeta extends ChartMeta {
    type: "pie" | "donut"
}

///////////
// TABLE //
///////////
interface TableConfig {
    total?: boolean,
    labelize?: boolean,
    checkboxButtons?: {
        title?: string
        actions?: ActionButton[]
    }
}
interface TableColumnMeta extends ApiAction {
    title?: string
    filter?: boolean
    totalize?: boolean,
    labelize?: boolean,
    collapse?: boolean,
    compare?: boolean,
    share?: boolean,
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