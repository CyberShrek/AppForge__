interface ReportModel {
    title?: string
    data?: MatrixData
    formulas?: string[]
    charts?: ChartConfig[]
    labels?: LabelConfig[]
    table?: TableConfig
    context?: ContextFields
    slot?: string
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
    image?: string | {[value: string]: string}
    background?: string
    framed?: boolean
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
    type: "line" | "bar" | "pie"
    name: string
    column: number
    color?: string|string[]
    fill?: boolean|string[]
}

interface LineGraphConfig extends ChartContentConfig {
    type: "line"
    dash?: boolean
    curve?: boolean
}

interface BarGraphConfig extends ChartContentConfig {
    type: "bar"
}

interface PieGraphConfig extends ChartContentConfig {
    type: "pie"
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
    colspan?: number
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
    name: string
    context: string[]
    title: string
    head: CompleteRow[]
    body: CompleteRow[]
    total: CompleteRow
}

/////////////
// CONTEXT //
/////////////
interface ContextFields {
    [label: string]: string
} // Value is field key

/////////////
// FEATURES //
/////////////
interface ColumnFeature {
    filter?: boolean
    hidden?:  boolean | "xlsx"
    totalize?: boolean | "collapse",
    colorize?: {
        positive?: boolean | string
        negative?: boolean | string
        background?: boolean | string
    }
    labelize?: LabelConfig
    useOptions?: {
        fromFields: string[]
        hideCode?:  boolean
    }
    useImages?: {
        associations: {[cellText: string]: string}
        hideText?: boolean
    }
    onClick?: ApiAction
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