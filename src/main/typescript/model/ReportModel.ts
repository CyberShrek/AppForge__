interface ReportModel {
    title?: string
    data?: MatrixData
    formulas?: string[]
    charts?: ChartConfig[]
    labels?: LabelConfig[]
    table?: TableConfig
    html?: string
    context?: ContextConfig
    slot?: string

    // Apply after fetching the report from server
    usedValues?: FormValues
    usedOptions?: FieldOptions
    // Used only by chained reports (called from another report)
    usedData?: MatrixData
}

///////////
// LABEL //
///////////
interface LabelConfig{
    title?: string
    valueCell?: number
    valueUnit?: string
    percentName?: string
    percentCell?: number
    image?: string | {[forCell: string]: string}
    background?: string
    frame?: boolean
}

///////////
// CHART //
///////////
interface ChartConfig {
    title?: string
    keyColumn?: number
    content?: ChartContentConfig | ChartContentConfig[]
}

interface ChartContentConfig {
    type: "line" | "bar" | "pie" | "donut"
    name: string
    column: number
    color?: string|string[]
}

interface LineGraphConfig extends ChartContentConfig {
    type:   "line"
    dash?:  boolean
    curve?: boolean
    fill?:  boolean
}

interface BarGraphConfig extends ChartContentConfig {
    type: "bar"
}

interface PieGraphConfig extends ChartContentConfig {
    type: "pie" | "donut"
}

///////////
// TABLE //
///////////
interface TableConfig {
    head: CompleteRow[]
    total?: boolean,
    pageSize?: number,
    columnFeatures?: ColumnFeature[]
    checkboxes?: {
        title?: string
        actions?: ActionButton[]
    }
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
    reportData: {
        title: string
        columns: string[]
    }[]
} // Value is field key

//////////////
// FEATURES //
//////////////
interface ColumnFeature extends ApiAction {
    filter?: boolean
    hidden?:  boolean
    totalize?: boolean,
    collapse?: boolean,
    colorize?: {
        positive?: boolean | string
        negative?: boolean | string
    }
    labelize?: LabelConfig
    linkCells?: string[]
}

interface ActionButton extends ApiAction {
    label?: string
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