interface Report {
    title?: string,
    add
}

interface HeadCell {
    content: string,
    rowSpan?: number,
    colSpan?: number,
    hasFiler?: boolean
}

type TableHead = Set<HeadCell[]>

type PrimaryCell = string
type ValueCell   = number|string
type TableBody   = Map<PrimaryCell[], ValueCell[]>