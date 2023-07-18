interface Report {
    title?: string,
    add
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
