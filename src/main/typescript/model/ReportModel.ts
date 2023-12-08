interface ReportModel {
    slot: string
    title?: string
    data: MatrixData
    columns: {[colName: string]: ColumnMeta}
    charts?: {[chartName: string]: ChartConfig}
    table?: TableConfig
    context?: ContextConfig

    // Apply after fetching the report from server
    usedValues?: FormValues
    usedOptions?: FieldOptions
    // Used only by chained reports (called from another report)
    usedData?: MatrixData
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
    collapse?: boolean,
    compare?: string,
    share?: boolean,
    linkCells?: string[]
}

type CompleteCell = {
    value: any,
    rowspan?: number,
    colspan?: number,
    total?: boolean,
    type?: string
}
type CompleteRow = CompleteCell[]
type MatrixData = RowData[]
type TableMapData = Map<PrimaryCellData[], CellData[]>
type RowData = CellData[]
type CellData = number|string
type PrimaryCellData = string

//////////
// XLSX //
//////////
interface XlsxTableModel {
    title: string
    context: string[]
    head: CompleteRow[]
    body: CompleteRow[]
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