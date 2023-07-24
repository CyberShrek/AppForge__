interface Report {
    title?: string
    charts?: ChartReport[]
    table?: TableReport
}

interface ChartReport{

}
interface TableReport{
    head: TableHead
    body: TableBody
    total: ValueCell[]
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
