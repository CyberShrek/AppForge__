type ReportModels = {[reportKey: string]: ReportModel}

interface ReportModel {
    title?: string
    charts?: ChartModel[]
    table?: TableModel
    context?: ContextModelConfig
}

///////////
// CHART //
///////////
interface ChartModel {
    title?: string
    diagram?: DiagramConfig|DiagramConfig[],
    data: ChartDatasets
}
type ChartDatasets = {[label: string]: ChartData }
type ChartData = number|number[]

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
    primaryColumnsNumber: number
    groupedColumnsNumber?: number
    data: TableArrayData
}
type HeadCell = CompleteCell & {
    addFilter?: boolean
}
type CompleteCell = {
    text: string,
    rowspan?: number,
    colspan?: number
}
type CompleteRow = CompleteCell[]
type TableArrayData = RowData[]
type TableMapData = Map<PrimaryCellData[], CellData[]>
type RowData = CellData[]
type CellData = number|string
type PrimaryCellData = string
type TableHead = HeadCell[][]

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

interface ContextModelConfig {
    fields?: {[label: string]: string } // Value is field key
}