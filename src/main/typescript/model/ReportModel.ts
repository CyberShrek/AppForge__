interface ReportModel {
    title?: string
    data?: MatrixData
    dataFeatures?: DataFeature[]
    charts?: ChartModel[]
    table?: TableModel
    context?: ContextFields
    slot?: string
}

///////////
// CHART //
///////////
interface ChartModel {
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
interface TableModel {
    head: TableHead
    primaryColumnsNumber?: number
    groupedColumnsNumber?: number
    hiddenColumns?: number[] // TODO implement
}
type CompleteCell = {
    text: string,
    rowspan?: number,
    colspan?: number
}
type CompleteRow = CompleteCell[]
type MatrixData = RowData[]
type TableMapData = Map<PrimaryCellData[], CellData[]>
type RowData = CellData[]
type CellData = number|string
type PrimaryCellData = string
type TableHead = string[]

//////////
// XLSX //
//////////
interface XlsxTableModel {
    name: string
    context: string[]
    title: string
    header: CompleteRow[]
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
// FEATURE //
/////////////
type DataFeature = {
    type: string
} & (TextColumn | NumericColumn)

interface TextColumn {
    type: "text"
    useOptionLabels?: {
        fromFields?: string[]
        showCode?: boolean
    }
}

interface NumericColumn {
    type: "numeric"
    colored?: boolean
    formula?: string
}