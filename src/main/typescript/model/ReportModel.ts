interface ReportModel {
    title?: string
    data?: MatrixData
    formulas?: string[]
    charts?: ChartConfig[]
    table?: TableConfig
    context?: ContextFields
    slot?: string
}

///////////
// CHART //
///////////
interface ChartConfig {
    title?: string
    diagram?: DiagramConfig|DiagramConfig[]
}

interface DiagramConfig {
    name?: string
    type?: string
    color?: string|string[]
}

///////////
// TABLE //
///////////
interface TableConfig {
    head: CompleteRow[]
    addTotal?: boolean
    addCheckboxes?: {
        actions?: ActionButton[]
    }
    columnFeatures?: ColumnFeature[]
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
    hidden?:  boolean | "xlsx"
    group?: {
        span?: boolean
        addTotal?: boolean
    }
    colors?: {
        positive?: boolean | string
        negative?: boolean | string
    }
    setOptions?: {
        fromFields: string[]
        hideCode?:  boolean
    }
    setImages?: {
        associations: {[cellText: string]: string}
        default?:  string
        hideText?: boolean
    }
    onClick?: ApiAction

}

interface ActionButton {
    label?: string
    image?: string
    placeholder?: string
    onClick?: ApiAction
}

interface ApiAction {
    fetchReport?: string
    fetchFile?:   string
}