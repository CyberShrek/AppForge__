interface ReportModel {
    title?: string
    charts?: ChartModel[]
    table?: TableModel
}

///////////
// CHART //
///////////
interface ChartModel {
    title?: string
    diagram?: DiagramConfig|DiagramConfig[],
    data: ChartDatasets,
    jpegExport?: {
        name: string
        context: {[fieldName: string]: FieldKey}
    }
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
    data: TableData
    total?: RowData,
    xlsxExport: {
        name: string
        context: {[fieldName: string]: FieldKey}
    }
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
type TableData = RowData[]
type RowData = CellData[]
type CellData = number|string
type PrimaryCellData = string
type TableHead = HeadCell[][]
type TableMap = Map<PrimaryCellData[], CellData[]>

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