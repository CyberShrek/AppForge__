interface Pair<F, S>{
    first: F
    second: S
}

type CompleteCell = {
    value: any,
    rowspan?: number,
    colspan?: number,
    total?: boolean,
    type?: string
}
type CompleteRow = CompleteCell[]
type MatrixData = RowData[]
type TableMapData = Map<PrimaryCellData[], CellData[]>
type RowData = CellData[]
type CellData = number|string|boolean|[]
type PrimaryCellData = string