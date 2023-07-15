interface Report {
    title?: string,
    add
}

type PrimaryCell  = string
type ValueCell    = number|string
type TableBodyMap = Map<PrimaryCell[], ValueCell[]>

