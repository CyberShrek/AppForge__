interface ReportModel {
    title?: string
    charts?: ChartModel[]
    table?: TableModel
}

interface ChartModel {

}
interface TableModel {
    head: TableHead
    body: TableBody
    total?: ValueCell[]
}

type TableHead = Set<HeadCell[]>
type HeadCell = {
    content: string,
    rowSpan?: number,
    colSpan?: number,
    hasFilter?: boolean
}

type TableBody   = Map<PrimaryCell[], ValueCell[]>
type PrimaryCell = string
type ValueCell   = number|string
