export class TableWizard {

    // The primary columns are the most left columns consist of "string" type cells
    primaryColumnsNumber: number = 0

    constructor(private data: MatrixData,
                private config: TableConfig) {

        this.data.forEach(row => {
            for (let i = 1; i <= row.length; i++) {
                if (typeof row[i - 1] !== "string") break
                if (i > this.primaryColumnsNumber) this.primaryColumnsNumber = i
            }
        })
    }

    // Returns array contains the given matrix data separated by the byColumn column
    splitData(data: MatrixData, byColumn: number): MatrixData[] {
        const result: MatrixData[] = []

        let previousColValue
        data.forEach(row => {
            if(row[byColumn] === previousColValue) {
                const rowCopy = [...row]
                if(this.columnIsSpanned(byColumn))
                    rowCopy[byColumn] += " span me"
                result[result.length - 1].push(rowCopy)

            }
            else
                result.push([row])

            previousColValue = row[byColumn]
        })

        return result
    }

    // Linearly spans columns corresponding to the config
    spanRows(rows: HTMLCollectionOf<HTMLTableRowElement>){

        let cellsToSpan:   HTMLTableCellElement[] = [],
            cellsToRemove: HTMLTableCellElement[] = []

        for (let row of rows) {
            for (let i = 0; i < row.cells.length; i++) {
                if (cellsToSpan[i] || this.config.columnFeatures[i]?.spanned) {
                    const cell = row.cells.item(i)
                    if(cellsToSpan[i]?.textContent === cell.textContent) {
                        cellsToSpan[i].rowSpan++
                        cellsToRemove.push(cell)
                    }
                    else cellsToSpan[i] = cell
                }
            }
        }
        cellsToRemove.forEach(cell => cell.remove())
    }

    // Misc helpers

    columnIsSpanned = (columnId) => !!(this.config.columnFeatures[columnId]?.spanned)
    columnIsHidden = (columnId) => !!(this.config.columnFeatures[columnId]?.hidden)
    columnIsStartOfTotal = (columnId) => !!(this.config.columnFeatures[columnId]?.addTotal)

}