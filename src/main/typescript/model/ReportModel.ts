interface ReportModel {
    title?: string
    data?: MatrixData
    formulas?: string[]
    charts?: ChartConfig[]
    labels?: LabelConfig[]
    table?: TableConfig
    html?: string
    context?: ContextFields
    slot?: string

    // Apply after fetching the report from server
    usedValues?: FormValues
    usedOptions?: FieldOptions
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
interface ContextFields {
    [label: string]: string
} // Value is field key

//////////////
// FEATURES //
//////////////
interface ColumnFeature {
    filter?: boolean
    hidden?:  boolean | "xlsx"
    totalize?: boolean | "collapse",
    colorize?: {
        positive?: boolean | string
        negative?: boolean | string
    }
    labelize?: LabelConfig
    onClick?: ApiAction & { forCells: string[] }
}

interface ActionButton {
    label?: string
    image?: string
    hint?: string
    onClick?: ApiAction
}

interface ApiAction {
    fetchReport?: string
    fetchFile?:   string
}

interface SubmittedApiAction extends ApiAction{
    pickedData: MatrixData
}