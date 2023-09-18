type ReportModels = {[reportKey: string]: ReportModel}

interface ReportModel {
    title?: string
    data?: MatrixData
    charts?: ChartModel[]
    table?: TableModel
    context?: ContextFields
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
    // TODO implement complex header
    //| string[][] | CompleteCell[][]

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

type ContextFields = {[label: string]: string } // Value is field key